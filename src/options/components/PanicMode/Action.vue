<template>
  <section>
    <!-- <h3>Action</h3> -->
    <!-- <h3>{{ sectionTitle }}</h3> -->

    <div>
      <div>
        <label>
          <input
            type="radio"
            name="action"
            :value="ActionType.CloseTab"
            @click="setAction(ActionType.CloseTab)"
            v-model="action"
          />
          <!-- {{ closeTabText }} -->
          <!-- Close tab -->
        </label>
      </div>

      <!-- <div>
        <label>
          <input
            type="radio"
            name="action"
            :value="ActionType.HideTab"
            @click="setAction(ActionType.HideTab)"
            v-model="action"
          />
          {{ hideTabText }}
          Hide tab
        </label>
      </div> -->

      <div>
        <label>
          <input
            type="radio"
            name="action"
            :value="ActionType.CloseWindow"
            @click="setAction(ActionType.CloseWindow)"
            v-model="action"
          />
          <!-- {{closeWindowText}} -->
          <!-- Close window -->
        </label>
      </div>

      <!-- <div>
        <label>
          <input
            type="radio"
            name="action"
            :value="ActionType.HideWindow"
            @click="setAction(ActionType.HideWindow)"
            v-model="action"
          />
          {{hideWindowText}}
          Hide window
        </label>
      </div> -->

      <!-- TODO option apply to all -->
      <!-- <div>
        <label>
          <input
            type="radio"
            name="action"
            :value="ActionType.HideAllWindows"
            @click="setAction(ActionType.HideAllWindows)"
            v-model="action"
          />
          {{hideAllWindowsText}}
          Hide all windows
        </label>
      </div> -->

      <!-- <div>
        <label>
          <input
            type="radio"
            name="action"
            :value="ActionType.MinimizeWindow"
            @click="setAction(ActionType.MinimizeWindow)"
            v-model="action"
          />
          {{minimizeWindowText}}
          Minimize window
        </label>
      </div> -->

      <div>
        <label>
          <input
            type="radio"
            name="action"
            :value="ActionType.Redirect"
            @click="setAction(ActionType.Redirect)"
            v-model="action"
          />
          <!-- {{redirectToWebsiteText}} -->
          <!-- Redirect to website -->
        </label>
      </div>
    </div>

    <div v-if="action === ActionType.Redirect" class="form-container">
      <!-- <input
        type="text"
        placeholder="e.g: https://www.mozilla.org"
        placeholder={{addressPlaceholder}}
        v-model="address"
      /> -->

      <!-- <button type="submit">Add</button> -->
      <!-- <button type="submit">{{submitText}}</button> -->

      <p class="error">{{ error }}</p>
    </div>

    <div class="options">
      <label>
        <input type="checkbox" v-model="isHidden" />
        <!-- Hide Content -->
      </label>

      <label>
        <input type="checkbox" v-model="isMuted" />
        <!-- Mute Media -->
      </label>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import extension from 'extensionizer';

import { ActionType } from '../../../shared/constants/ActionType';
import { StoreKey } from '../../../shared/constants/StoreKey';

export default {
  setup() {
    const action = ref(ActionType.CloseTab);
    const address = ref('');
    const isHidden = ref(false);
    const isMuted = ref(false);
    const error = ref('');

    const setAction = (actionType: ActionType) => {
      action.value = actionType;
    };

    onMounted(() => {
      extension.storage.local.get(StoreKey.Action, (res) => {
        // TODO
        action.value = res.action?.name ?? '';
      });
    });

    onMounted(() => {
      extension.storage.local.get(StoreKey.Options, (res) => {
        isHidden.value = res.options?.hide;
        isMuted.value = res.options?.mute;
      });
    });

    watch(action, () => {
      if (action.value === ActionType.Redirect && !address.value) {
        return;
      }

      extension.storage.local.set({
        action: {
          name: action.value,
          address: address.value,
        },
      });
    });

    watch([isMuted, isHidden], () => {
      extension.storage.local.set({
        options: {
          hide: isHidden.value,
          mute: isMuted.value,
        },
      });
    });

    return {
      action,
      address,
      isHidden,
      isMuted,
      error,
      setAction,
      ActionType,
      // sectionTitle: t(''),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../../shared/reset.scss';

.options {
  margin-top: 6px;
  display: flex;

  label {
    margin-right: 15px;
  }
}

.form-container {
  input[type='text'] {
    margin-top: 6px;
    min-width: 190px;
  }
}

// .options {
//   >
label {
  // input {
  //   padding-right: 10px;
  //   display: inline-block;
  // }

  display: flex;
  align-items: center;
  // background:red;
}
// }
</style>
