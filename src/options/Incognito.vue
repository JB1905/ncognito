<template>
  <div class="incognito">
    <h1>{{ name }}</h1>

    <label>
      <input type="checkbox" @click="toggle()" :checked="enabled" /> Enable
    </label>

    <div v-if="this.enabled">
      <p>Add addresses, protocols or paths to be opened only in private mode</p>

      <div>
        <div>
          <input
            type="radio"
            id="address"
            name="type"
            value="address"
            v-model="type"
          />
          <label for="address">Address</label>
        </div>

        <div>
          <input
            type="radio"
            id="protocol"
            name="type"
            value="protocol"
            v-model="type"
          />
          <label for="protocol">Protocol</label>
        </div>

        <div>
          <input
            type="radio"
            id="path"
            name="type"
            value="path"
            v-model="type"
          />
          <label for="path">Path</label>
        </div>

        <div class="add-to-list">
          <input
            type="text"
            placeholder="e.g: google, http"
            value="{url}"
            v-model="url"
          />
          <button @click="add()">Add</button>
        </div>

        <div class="error">{{ error }}</div>

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
              <button type="submit" @click="edit(index)">Edit</button>
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
      name: 'Always incognito',
      enabled: '',
      addresses: [],
      url: '',
      type: '',
      error: ''
    };
  },
  created() {
    extension.storage.local.get('incognitoEnabled', res => {
      if (res.incognitoEnabled) {
        this.enabled = true;

        this.list();
      } else this.enabled = false;
    });
  },
  methods: {
    toggle() {
      if (this.enabled) this.enabled = false;
      else this.enabled = true;

      extension.storage.local.set({
        incognitoEnabled: this.enabled
      });
    },
    list() {
      extension.storage.local.get('addresses', res => {
        this.addresses = res.addresses;
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

            if (check.length > 0) {
              this.error = 'Item already exists';

              return;
            } else {
              this.error = '';
            }
          }

          const address = {
            url: this.url,
            type: this.type
          };

          if (!res.addresses) {
            this.addresses.push(address);
          } else {
            this.addresses = res.addresses;

            const inArray = this.addresses.filter(
              obj => obj.url === address.url && obj.type === address.type
            );

            if (inArray.length === 0) this.addresses.push(address);
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
    edit(index) {
      extension.storage.local.get('addresses', res => {
        const addresses = res.addresses;

        /*extension.storage.local.set(
          {
            addresses: addresses.filter((value, i) => i !== index && value)
          },
          () => this.list()
        );*/
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
  }
};
</script>

<style lang="scss" scoped>
@import '../reset.scss';

.incognito {
  flex: 1;
}

.add-to-list {
  margin-top: 10px;
}
</style>
