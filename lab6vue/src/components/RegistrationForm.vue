<template>
  <div class="p-4 bg-white shadow-md">
    <h2 class="text-lg font-bold mb-2">Register Participant</h2>
    <form @submit.prevent="saveParticipant">
      <!-- Ім'я -->
      <div class="mb-2">
        <label for="name" class="block">Name</label>
        <input v-model="name" type="text" id="name" class="border w-full p-2" />
        <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
      </div>

      <!-- Email -->
      <div class="mb-2">
        <label for="email" class="block">Email</label>
        <input v-model="email" type="email" id="email" class="border w-full p-2" />
        <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
      </div>

      <!-- Телефон -->
      <div class="mb-2">
        <label for="phone" class="block">Phone</label>
        <input v-model="phone" type="text" id="phone" class="border w-full p-2" />
        <span v-if="errors.phone" class="text-red-500">{{ errors.phone }}</span>
      </div>

      <!-- Дата народження -->
      <div class="mb-4">
        <label for="dob" class="block">Date of Birth</label>
        <input v-model="dob" type="date" id="dob" class="border w-full p-2" :max="today" />
        <span v-if="errors.dob" class="text-red-500">{{ errors.dob }}</span>
      </div>

      <!-- Кнопка сабміту -->
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'RegistrationForm',
  emits: ['addParticipant'],
  setup(_, { emit }) {
    const name = ref('');
    const email = ref('');
    const phone = ref('');
    const dob = ref('');
    const errors = ref<{ [key: string]: string }>({});

    const today = new Date().toISOString().split('T')[0];

    const validateForm = () => {
      errors.value = {};

      // Валідація імені
      if (!name.value) {
        errors.value.name = 'Name is required';
      }

      // Валідація email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value) {
        errors.value.email = 'Email is required';
      } else if (!emailPattern.test(email.value)) {
        errors.value.email = 'Invalid email format';
      }

      // Валідація телефону
      const phonePattern = /^\+?[0-9]{10,15}$/;
      if (!phone.value) {
        errors.value.phone = 'Phone number is required';
      } else if (!phonePattern.test(phone.value)) {
        errors.value.phone = 'Invalid phone number format';
      }

      // Валідація дати народження
      if (!dob.value) {
        errors.value.dob = 'Date of birth is required';
      } else if (dob.value > today) {
        errors.value.dob = 'Date of birth cannot be in the future';
      }

      return Object.keys(errors.value).length === 0;
    };

    const saveParticipant = () => {
      if (validateForm()) {
        emit('addParticipant', { name: name.value, email: email.value, phone: phone.value, dob: dob.value });

        name.value = '';
        email.value = '';
        phone.value = '';
        dob.value = '';
        errors.value = {};
      }
    };

    return { name, email, phone, dob, today, errors, saveParticipant };
  },
});
</script>
