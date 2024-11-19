<template>
  <div class="p-4 bg-white shadow-md">
    <h2 class="text-lg font-bold mb-2">Participants</h2>
    <table class="table-auto w-full">
      <thead>
      <tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Phone</th>
        <th class="px-4 py-2">DOB</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="participant in participants" :key="participant.id">
        <td class="border px-4 py-2">{{ participant.name }}</td>
        <td class="border px-4 py-2">{{ participant.email }}</td>
        <td class="border px-4 py-2">{{ participant.phone }}</td>
        <td class="border px-4 py-2">{{ participant.dob }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


interface Participant {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
}

export default defineComponent({
  name: 'ParticipantsTable',
  props: {
    participants: {
      type: Array as () => Participant[],
      required: true
    }
  }
});
</script>
