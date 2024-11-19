<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Lottery App</h1>
    <div class="grid grid-cols-3 gap-4">
      <WinnersBlock :participants="participants" @removeWinner="removeWinner" />
      <RegistrationForm @addParticipant="addParticipant" />
      <ParticipantsTable :participants="participants" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import WinnersBlock from './components/WinnersBlock.vue';
import RegistrationForm from './components/RegistrationForm.vue';
import ParticipantsTable from './components/ParticipantsTable.vue';

export default defineComponent({
  name: 'App',
  components: { WinnersBlock, RegistrationForm, ParticipantsTable },
  setup() {
    const participants = ref<Array<{ id: number, name: string, email: string, phone: string, dob: string }>>([]);

    const addParticipant = (participant: { name: string, email: string, phone: string, dob: string }) => {
      participants.value.push({ ...participant, id: participants.value.length + 1 });
    };

    const removeWinner = (winnerId: number) => {
      participants.value = participants.value.filter(p => p.id !== winnerId);
    };

    return { participants, addParticipant, removeWinner };
  },
});
</script>
