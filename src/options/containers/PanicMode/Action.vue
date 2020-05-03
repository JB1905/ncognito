<template>
  <section>
    <h3>Action</h3>

    <div>
      <div>
        <label>
          <input
            type="radio"
            name="action"
            :value="ActionType.Tab"
            @click="setAction(ActionType.Tab)"
            v-model="action"
          />
          Close tab
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            name="action"
            :value="ActionType.Window"
            @click="setAction(ActionType.Window)"
            v-model="action"
          />
          Close window
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            name="action"
            :value="ActionType.Redirect"
            v-model="action"
          />
          Redirect to website
        </label>
      </div>
    </div>

    <div v-if="action === 'redirect'" class="form-container">
      <input
        type="text"
        placeholder="e.g: https://www.mozilla.org"
        v-model="address"
      />

      <button type="submit" @click="setAction(ActionType.Redirect)">Add</button>

      <p class="error">{{ error }}</p>

      <div class="options">
        <label>
          <input
            type="checkbox"
            v-model="isHidden"
            @click="setOptions('hide')"
          />
          Hide
        </label>

        <label>
          <input
            type="checkbox"
            v-model="isMuted"
            @click="setOptions('mute')"
          />
          Mute
        </label>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import extension from 'extensionizer';

import { ActionType } from '../../../shared/enums/ActionType';

export default {
  setup() {
    const action = ref<ActionType>();
    const address = ref('');
    const isHidden = ref(false);
    const isMuted = ref(false);
    const error = ref('');

    const setAction = (actionType: ActionType) => {
      action.value = actionType;
    };

    const setOptions = (optionName: string) => {};

    onMounted(() => {
      extension.storage.local.get('action', (res) => {
        // console.log(res.action.name)

        // TODO
        action.value = res.action?.name ?? '';
      });
    });

    onMounted(() => {
      extension.storage.local.get('options', (res) => {});
    });

    watch(action, () => {
      if (action.value === ActionType.Redirect && !address.value) {
        return;
      }

      // console.log(action.value,  address.value)

      extension.storage.local.set({
        action: {
          name: action.value,
          address: address.value,
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
      setOptions,
      ActionType,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../../shared/reset.scss';

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
