<template>
  <section>
    <h3>Way of evacuation</h3>

    <div>
      <input
        type="radio"
        name="exit"
        id="piano"
        value="piano"
        @click="changeEvacuationWay('piano')"
        v-model="evacuationWay"
      />
      <label for="piano">Pianist's mode <sup>1</sup></label>
    </div>

    <div>
      <input
        type="radio"
        name="exit"
        id="shortcode"
        value="shortcode"
        v-model="evacuationWay"
      />
      <label for="shortcode">Shortcode</label>
    </div>

    <div v-if="evacuationWay === 'shortcode'" class="container__form">
      <input
        type="text"
        id="shortcode"
        placeholder="e.g: shift+e"
        v-model="shortcode"
      />

      <button type="submit" @click="changeEvacuationWay('shortcode')">
        Set
      </button>

      <p class="error">{{ error }}</p>
    </div>

    <p>
      <sup>1</sup>
      <i>Leaving the private mode by simultaneously pressing at least 4 keys</i>
    </p>
  </section>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import extension from 'extensionizer';

export default {
  setup() {
    const evacuationWay = ref('');
    const shortcode = ref('');
    const error = ref('');

    // onMounted(() => {
    //   extension.storage.local.get('panicModeEnabled', (res) => {
    //     // if (res.panicModeEnabled) {
    //     //   isEnabled = true;
    //     //   init();
    //     // } else{ isEnabled = false;}
    //   });
    // });

    const changeEvacuationWay = (way) => {
      if (way === 'piano') {
        extension.storage.local.set({
          evacuation: {
            name: 'piano',
          },
        });
      } else if (way === 'shortcode') {
        if (shortcode.value) {
          extension.storage.local.set({
            evacuation: {
              name: 'shortcode',
              shortcode: shortcode.value,
            },
          });
        } else {
          error.value = 'Shortcode is required';
        }
      }
    };

    onMounted(() => {
      extension.storage.local.get('evacuation', (res) => {
        if (!res.evacuation) {
          extension.storage.local.set({
            evacuation: {
              name: 'piano',
            },
          });

          evacuationWay.value = 'piano';
        } else {
          if (res.evacuation.name === 'piano') {
            evacuationWay.value = 'piano';
          } else if (res.evacuation.name === 'shortcode') {
            evacuationWay.value = 'shortcode';

            shortcode.value = res.evacuation.shortcode;
          }
        }
      });
    });

    return {
      shortcode,
      evacuationWay,
      changeEvacuationWay,
      error,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../../reset.scss';
</style>
