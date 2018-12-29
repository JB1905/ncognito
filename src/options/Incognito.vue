<template>
  <div class="container">
    <h2>Always incognito</h2>

    <label>
      <input type="checkbox" v-model="enabled" @click="toggle()" /> Enable
    </label>

    <div v-if="this.enabled">
      <p>Add addresses, protocols or paths to be opened only in private mode</p>

      <div>
        <div>
          <label>
            <input type="radio" name="type" value="address" v-model="type" />
            Address
          </label>
        </div>

        <div>
          <label>
            <input type="radio" name="type" value="protocol" v-model="type" />
            Protocol
          </label>
        </div>

        <div>
          <label>
            <input type="radio" name="type" value="path" v-model="type" /> Path
          </label>
        </div>

        <div class="form-container">
          <input
            type="text"
            placeholder="e.g: google, http"
            value="{url}"
            v-model="url"
          />
          <button @click="add()">Add</button>
        </div>

        <p class="error">{{ error }}</p>

        <table v-if="addresses.length > 0">
          <tr>
            <th>URL</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>

          <tr v-for="(address, index) in addresses">
            <td>{{ address.url }}</td>
            <td>{{ address.type }}</td>
            <td>
              <button type="submit" @click="remove(index)">Remove</button>
            </td>
          </tr>
        </table>

        <button v-if="addresses.length" @click="clear()">Clear</button>
      </div>
    </div>
  </div>
</template>

<script>
import extension from 'extensionizer';

export default {
  data() {
    return {
      enabled: '',
      addresses: [],
      url: '',
      type: '',
      error: ''
    };
  },
  created() {
    extension.storage.local.get('incognitoEnabled', res => {
      this.enabled = res.incognitoEnabled;

      if (!!this.enabled) this.list();
    });
  },
  methods: {
    toggle() {
      this.enabled = !this.enabled;

      extension.storage.local.set({
        incognitoEnabled: this.enabled
      });
    },
    list() {
      extension.storage.local.get('addresses', res => {
        if (res.addresses) this.addresses = res.addresses;
      });
    },
    add() {
      extension.storage.local.get('addresses', res => {
        if (this.url && this.type) {
          if (this.error) this.error = '';

          if (res.addresses && res.addresses.length) {
            const check = res.addresses.filter(
              address => address.url === this.url && address.type === this.type
            );

            if (check.length) this.error = 'Item already exists';
            else this.error = '';
          }

          const address = {
            url: this.url,
            type: this.type
          };

          if (res.addresses) {
            this.addresses = res.addresses;

            const inArray = this.addresses.filter(
              obj => obj.url === address.url && obj.type === address.type
            );

            if (!inArray.length) this.addresses.push(address);
          } else {
            this.addresses.push(address);
          }

          extension.storage.local.set({
            addresses: this.addresses
          });

          this.url = '';
          this.type = '';
        } else {
          this.error = 'Type and value are required.';
        }
      });
    },
    remove(index) {
      extension.storage.local.get('addresses', res => {
        const addresses = res.addresses;

        if (confirm('Are you sure you want to remove this addresses?')) {
          extension.storage.local.set(
            {
              addresses: addresses.filter((value, i) => i !== index && value)
            },
            () => this.list()
          );
        }
      });
    },
    clear() {
      if (confirm('Are you sure you want to erase saved addresses?')) {
        extension.storage.local.set(
          {
            addresses: []
          },
          () => {
            this.url = '';
            this.type = '';
            this.error = '';

            this.list();
          }
        );
      }
    }
  },
  watch: {
    enabled() {
      if (this.enabled) this.list();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../reset.scss';
</style>
