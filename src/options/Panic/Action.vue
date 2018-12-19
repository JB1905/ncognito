<template>
  <section>
    <h3>{{ name }}</h3>

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

    <div v-if="action === 'redirect'">
      <input
        type="text"
        placeholder="e.g: https://www.mozilla.org"
        v-model="address"
      />
      <button type="submit" @click="set('redirect')">Add</button>

      <button @click="clear()">Reset destination page</button>

      <span class="error">{{ error }}</span>
    </div>
  </section>
</template>

<script>
import extension from 'extensionizer';

import { pattern } from '../../helpers/pattern';

export default {
  data() {
    return {
      name: 'Action',
      action: '',
      address: '',
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
</style>
