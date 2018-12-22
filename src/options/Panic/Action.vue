<template>
  <section>
    <h3>Action</h3>

    <div>
      <div>
        <input
          type="radio"
          id="tab"
          @click="set('tab')"
          name="action"
          value="tab"
          v-model="action"
        />
        <label for="tab">Close tab</label>
      </div>

      <div>
        <input
          type="radio"
          id="window"
          @click="set('window')"
          name="action"
          value="window"
          v-model="action"
        />
        <label for="window">Close window</label>
      </div>

      <div>
        <input
          type="radio"
          id="redirect"
          name="action"
          value="redirect"
          v-model="action"
        />
        <label for="redirect">Redirect to website</label>
      </div>
    </div>

    <div v-if="action === 'redirect'" class="form-container">
      <input
        type="text"
        placeholder="e.g: https://www.mozilla.org"
        v-model="address"
      />
      <button type="submit" @click="set('redirect')">Add</button>

      <button @click="clear()">Reset destination page</button>

      <p class="error">{{ error }}</p>

      <div class="options">
        <label for="hide">
          <input type="checkbox" v-model="hidden" id="hide" @click="hide()" />
          Hide
        </label>

        <label for="mute">
          <input type="checkbox" v-model="muted" id="mute" @click="mute()" />
          Mute
        </label>
      </div>
    </div>
  </section>
</template>

<script>
import extension from 'extensionizer';

import { pattern } from '../../helpers/pattern';

export default {
  data() {
    return {
      action: '',
      address: '',
      hidden: '',
      muted: '',
      error: ''
    };
  },
  created() {
    extension.storage.local.get('panicModeEnabled', res => {
      if (res.panicModeEnabled) {
        this.enabled = true;

        this.init();
      } else this.enabled = false;
    });
  },
  methods: {
    init() {
      extension.storage.local.get('action', res => {
        if (!res.action) {
          extension.storage.local.set({
            action: {
              name: 'tab'
            }
          });

          this.action = 'tab';
        } else {
          if (res.action.name === 'redirect') {
            this.action = 'redirect';
            this.address = res.action.address;
          } else if (res.action.name === 'tab') {
            this.action = 'tab';
          } else if (res.action.name === 'window') {
            this.action = 'window';
          }
        }
      });

      extension.storage.local.get('hide', res => {
        if (!res.hide) {
          extension.storage.local.set({ hide: false });

          this.hidden = false;
        } else {
          this.hidden = true;
        }
      });

      extension.storage.local.get('mute', res => {
        if (!res.mute) {
          extension.storage.local.set({ mute: false });

          this.muted = false;
        } else {
          this.muted = true;
        }
      });
    },
    set(action) {
      if (action === 'redirect') {
        if (this.address && pattern.test(this.address)) {
          extension.storage.local.set({
            action: {
              name: 'redirect',
              address: this.address
            }
          });

          this.error = '';
        } else {
          this.error = 'Address is incorrect';
        }
      } else if (action === 'tab') {
        extension.storage.local.set({
          action: {
            name: 'tab'
          }
        });
      } else if (action === 'window') {
        extension.storage.local.set({
          action: {
            name: 'window'
          }
        });
      }
    },
    mute() {
      extension.storage.local.set({ mute: !this.muted });
    },
    hide() {
      extension.storage.local.set({ hide: !this.hidden });
    },
    clear() {
      if (confirm('Reset destination page?')) {
        extension.storage.local.remove('action', () => {
          this.action = '';
          this.address = '';

          this.init();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../reset.scss';

.options {
  > label {
    margin-right: 10px;
  }
}
</style>
