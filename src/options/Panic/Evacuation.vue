<template>
  <section>
    <h3>Way of evacuation</h3>

    <div>
      <input
        type="radio"
        name="exit"
        id="piano"
        @click="set()"
        value="piano"
        v-model="way"
      />
      <label for="piano">Pianist's mode <sup>1</sup></label>
    </div>

    <div>
      <input
        type="radio"
        name="exit"
        id="shortcode"
        value="shortcode"
        v-model="way"
      />
      <label for="shortcode">Shortcode</label>
    </div>

    <div v-if="way === 'shortcode'" class="form-container">
      <input
        type="text"
        id="shortcode"
        placeholder="e.g: shift+e"
        v-model="shortcode"
      />

      <button type="submit" class="save-code" @click="set()">Set</button>
      <button @click="reset()">Reset shortcode</button>

      <p class="error">{{ error }}</p>
    </div>

    <p>
      <sup>1</sup>
      <i>Leaving the private mode by simultaneously pressing at least 4 keys</i>
    </p>
  </section>
</template>

<script>
import extension from 'extensionizer';

export default {
  data() {
    return {
      way: '',
      shortcode: '',
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
      extension.storage.local.get('evacuation', res => {
        if (!res.evacuation) {
          extension.storage.local.set({
            evacuation: {
              name: 'piano'
            }
          });

          this.way = 'piano';
        } else {
          if (res.evacuation.name === 'piano') {
            this.way = 'piano';
          } else if (res.evacuation.name === 'shortcode') {
            this.way = 'shortcode';
            this.shortcode = res.evacuation.shortcode;
          }
        }
      });
    },
    set() {
      if (this.way === 'piano') {
        extension.storage.local.set({
          evacuation: {
            name: 'piano'
          }
        });
      } else if (this.way === 'shortcode') {
        if (this.shortcode) {
          extension.storage.local.set({
            evacuation: {
              name: 'shortcode',
              shortcode: this.shortcode
            }
          });
        } else {
          this.error = 'Shortcode is required';
        }
      }
    },
    reset() {
      if (confirm('Reset evacuation action?')) {
        extension.storage.local.remove('evacuation', () => {
          this.way = '';
          this.shortcode = '';

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
