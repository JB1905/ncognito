<template>
  <div class="container">
    <h2>Always incognito</h2>

    <label>
      <input
        type="checkbox"
        v-model="isIncognitoModeEnabled"
        @click="toggleIncognitoMode"
      />
      Enable
    </label>

    <div v-if="isIncognitoModeEnabled">
      <p>Add addresses, protocols or paths to be opened only in private mode</p>

      <div>
        <div>
          <label>
            <input
              type="radio"
              name="type"
              :value="IncognitoPattern.Address"
              v-model="type"
            />
            Address
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="type"
              :value="IncognitoPattern.Protocol"
              v-model="type"
            />
            Protocol
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="type"
              :value="IncognitoPattern.Path"
              v-model="type"
            />
            Path
          </label>
        </div>

        <div class="container__form">
          <input type="text" placeholder="e.g: google, http" v-model="url" />

          <button @click="createAddress">Add</button>
        </div>

        <p class="error">{{ error }}</p>

        <div v-if="addresses.length">
          <table>
            <tr>
              <th>URL</th>
              <th>Type</th>
              <th></th>
              <!-- <th>Actions</th> -->
            </tr>

            <tr v-for="(address, index) in addresses" :key="index">
              <td>{{ address.url }}</td>
              <td>{{ address.type }}</td>
              <td>
                <button type="submit" @click="removeAddress(index)">
                  Remove
                </button>
              </td>
            </tr>
          </table>

          <button @click="clearAddresses">Clear</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import extension from 'extensionizer';

import { Address } from '../../shared/types/Address';

import { IncognitoPattern } from '../../shared/enums/IncognitoPattern';

export default {
  setup() {
    const isIncognitoModeEnabled = ref(false);
    const addresses = ref<Address[]>([]);
    const url = ref('');
    const type = ref<IncognitoPattern>();
    const error = ref('');

    const toggleIncognitoMode = () => {
      isIncognitoModeEnabled.value = !isIncognitoModeEnabled.value;
    };

    const loadAddressList = () => {
      extension.storage.local.get('addresses', (res) => {
        if (res.addresses) {
          addresses.value = JSON.parse(res.addresses);
        }
      });
    };

    const createAddress = () => {
      if (url.value && type.value) {
        if (error.value) {
          error.value = '';
        }

        const check = addresses.value.filter((address) => {
          return address.url === url.value && address.type === type.value;
        });

        error.value = check.length ? 'Item already exists' : '';

        const address = {
          url: url.value,
          type: type.value,
        };

        if (addresses.value.length > 0) {
          const inArray = addresses.value.filter(
            (item) => item.url === address.url && item.type === address.type
          );

          if (!inArray.length) {
            addresses.value = [...addresses.value, address];
          }
        } else {
          addresses.value = [...addresses.value, address];
        }

        url.value = '';
        type.value = undefined;
      } else {
        error.value = 'Type and value are required';
      }
    };

    const removeAddress = (id: number) => {
      if (confirm('Are you sure you want to remove this addresses?')) {
        addresses.value = [
          ...addresses.value.filter((value, index) => index !== id && value),
        ];
      }
    };

    const clearAddresses = () => {
      if (confirm('Are you sure you want to erase saved addresses?')) {
        addresses.value = [];

        url.value = '';
        type.value = undefined;
        error.value = '';
      }
    };

    onMounted(() => {
      extension.storage.local.get('incognitoEnabled', (res) => {
        isIncognitoModeEnabled.value = res.incognitoEnabled;

        if (isIncognitoModeEnabled.value) {
          loadAddressList();
        }
      });
    });

    watch(addresses, () => {
      extension.storage.local.set({
        addresses: JSON.stringify(addresses.value),
      });
    });

    watch(isIncognitoModeEnabled, () => {
      extension.storage.local.set({
        incognitoEnabled: isIncognitoModeEnabled.value,
      });

      // if (isIncognitoModeEnabled.value) {
      //   loadAddressList();
      // }
    });

    return {
      url,
      type,
      error,
      addresses,
      isIncognitoModeEnabled,
      toggleIncognitoMode,
      createAddress,
      removeAddress,
      clearAddresses,
      IncognitoPattern,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../shared/reset.scss';
</style>
