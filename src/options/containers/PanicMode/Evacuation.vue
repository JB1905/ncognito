<template>
  <section>
    <h3>Way of evacuation</h3>

    <div>
      <input
        type="radio"
        name="exit"
        id="piano"
        :value="EvacuationWay.Pianist"
        @click="changeEvacuationWay(EvacuationWay.Pianist)"
        v-model="evacuationWay"
      />
      <label for="piano">Pianist's mode <sup>1</sup></label>
    </div>

    <div>
      <input
        type="radio"
        name="exit"
        id="shortcode"
        :value="EvacuationWay.Shortcode"
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

      <button
        type="submit"
        @click="changeEvacuationWay(EvacuationWay.Shortcode)"
      >
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
import { ref, onMounted, watch } from 'vue';
import extension from 'extensionizer';

import { EvacuationWay } from '../../../shared/enums/EvacuationWay';

export default {
  setup() {
    const evacuationWay = ref<EvacuationWay>();
    const shortcode = ref('');
    const error = ref('');

    const changeEvacuationWay = (way: EvacuationWay) => {
      evacuationWay.value = way;

      // console.log(way);
    };

    onMounted(() => {
      extension.storage.local.get('evacuation', (res) => {
        // console.log(res.evacuation);

        evacuationWay.value = res.evacuation?.name ?? 'piano';

        if (res.evacuation?.name === 'shortcode') {
          shortcode.value = res.evacuation?.shortcode;
        }
      });
    });

    watch(evacuationWay, () => {
      // console.log(evacuationWay.value, shortcode.value);

      if (
        evacuationWay.value !== EvacuationWay.Shortcode ||
        (evacuationWay.value === EvacuationWay.Shortcode && shortcode.value)
      ) {
        // console.log(false, true);

        extension.storage.local.set({
          evacuation: {
            name: evacuationWay.value,
            // shortcode: shortcode.value
          },
        });
      }
    });

    return {
      shortcode,
      evacuationWay,
      changeEvacuationWay,
      error,
      EvacuationWay,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../../shared/reset.scss';
</style>
