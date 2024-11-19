<template>
  <div class="p-4 bg-white shadow-md">
    <h2 class="text-lg font-bold mb-2">Winners</h2>
    <ul class="mb-4">
      <li v-for="winner in winners" :key="winner.id">
        {{ winner.name }} - <button class="text-red-500" @click="removeWinner(winner.id)">Remove</button>
      </li>
    </ul>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      :disabled="winners.length >= 3 || participants.length === 0"
      @click="selectNewWinner"
    >
      New Winner
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Participant {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'WinnersBlock',
  props: {
    participants: {
      type: Array as () => Participant[],
      required: true
    }
  },
  emits: ['removeWinner'],
  setup(props, { emit }) {
    const winners = ref<Participant[]>([]);

    const selectNewWinner = () => {
      const remainingParticipants = props.participants.filter(p =>
        !winners.value.some(winner => winner.id === p.id)
      );

      if (remainingParticipants.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingParticipants.length);
        const newWinner = remainingParticipants[randomIndex];

        winners.value.push(newWinner);
      }
    };

    const removeWinner = (id: number) => {
      winners.value = winners.value.filter(winner => winner.id !== id);
      emit('removeWinner', id);
    };

    return { winners, selectNewWinner, removeWinner };
  },
});
</script>
