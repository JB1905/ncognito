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
        <input
          type="checkbox"
          v-model="hidden"
          id="hide"
          @click="options('hide')"
        />
        <label for="hide">Hide</label>

        <input
          type="checkbox"
          v-model="muted"
          id="mute"
          @click="options('mute')"
        />
        <label for="mute">Mute</label>
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

      extension.storage.local.get('options', res => {
        let options = res.options || {};

        if (!options.hide) options.hide = this.hidden = false;
        else this.hidden = true;

        if (!options.mute) options.mute = this.muted = false;
        else this.muted = true;

        extension.storage.local.set({ options });
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
    options(name) {
      extension.storage.local.get('options', res => {
        const options = res.options;

        options[name] = !options[name];
  
        extension.storage.local.set({ options });
      });
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
