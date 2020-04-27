<template>
  <div class="container">
    <div v-if="!hasGameStarted" class="add-player-form">
      <form
        @submit.prevent="addPlayer()"
        ref="addPlayerForm"
        class="add-player-form"
      >
        <input
          type="text"
          name="name"
          v-model="playerName"
          class="input add-player-form-input"
          required
        />
        <button type="submit" class="btn add-player-form-btn">
          Agregar Jugador
        </button>

        <button
          @click.prevent="startGame"
          class="btn start-game-btn"
          :disabled="players.length <= 1"
        >
          Comenzar juego
        </button>
      </form>
    </div>

    <div>
      <div class="flex">
        <div v-for="player in players" v-bind:key="player.name">
          <h2>{{ player.name }}</h2>
        </div>
      </div>

      <hr v-if="!isGameOver && hasGameStarted" />

      <div class="flex" v-for="(round, index) in rounds" v-bind:key="index">
        <div
          class="round-score"
          v-bind:class="{ highlighted: isLastRound(index) }"
          v-for="(player, p) in players"
          v-bind:key="player.name + p + index"
        >
          {{ round[player.name] }}
        </div>
      </div>

      <!--div class="flex" v-if="!isGameOver && hasGameStarted"-->
      <form
        @submit.prevent="addRound()"
        v-if="!isGameOver && hasGameStarted"
        ref="addRoundForm"
      >
        <div class="flex">
          <div v-for="(player, index) in players" v-bind:key="player.name">
            <input
              :tabindex="index + 1"
              type="number"
              required
              class="input add-score-input"
              v-model="scores[player.name]"
              ref="playerScore"
            />
          </div>
        </div>

        <div class="flex">
          <button type="submit" class="btn" style="width: 100%;">
            Proxima Ronda
          </button>
        </div>
      </form>

      <!--div class="flex">
        <div v-for="player in players" v-bind:key="player.name">{{ player.score }}</div>
      </div-->

      <!--/div-->
      <div class v-if="isGameOver">
        <div class="flex">
          <h1>{{ result }}</h1>
        </div>
        <div class="flex">
          <button class="btn" @click.prevent="resetGame">Jugar de nuevo</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface Player {
  name: string;
  score: number;
  rounds: number[];
  hasLost?: boolean;
}

@Component
export default class ScorePad extends Vue {
  private players: Player[] = [];
  private isGameOver = false;
  private hasGameStarted = false;
  private THRESHOLD_SCORE = 100;

  private playerName = "";
  private result = "";
  private scores: Record<string, number> = {};
  private rounds: Record<string, number>[] = [];

  addPlayer(): void {
    this.players.push({
      name: this.playerName,
      score: 0,
      rounds: [],
      hasLost: false
    });

    this.playerName = "";

    (this.$refs.addPlayerForm as HTMLFormElement).reset();
  }

  get isFirstRound(): boolean {
    return this.rounds.length === 1;
  }

  isLastRound(index: number): boolean {
    return this.rounds.length === index + 1;
  }

  addRound() {
    const round: Record<string, number> = {};
    this.players.forEach((player: Player) => {
      const score: number = this.scores[player.name];
      player.score += +score;

      round[player.name] = player.score;

      if (player.score > this.THRESHOLD_SCORE) {
        player.hasLost = true;
        this.result = `${player.name} sos LOSER!!!`;
        this.isGameOver = true;
      }
    });

    this.rounds.push(round);

    this.scores = {};

    (this.$refs.addRoundForm as HTMLFormElement).reset();

    (this.$refs.playerScore as HTMLInputElement[])[0].focus();
  }

  startGame() {
    this.hasGameStarted = true;
  }

  resetGame() {
    this.hasGameStarted = false;
    this.players = [];
    this.isGameOver = false;
    this.scores = {};
    this.rounds = [];
  }
}
</script>

<style scoped lang="scss">
.round-score {
  font-size: 2rem;
  text-align: center;
  padding: 1rem;
}

.add-player-form {
  margin-bottom: 1rem;
}

.add-score-input {
  width: 100px;
  max-width: 100%;
  text-align: center;
}

.add-round-form {
  display: contents;
}
</style>
