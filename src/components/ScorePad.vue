<template>
  <div>
    <div v-if="!hasGameStarted">
      <form @submit.prevent="addPlayer()" ref="addPlayerForm(playerName)">
        <input type="text" name="name" v-model="playerName" />
        <input type="submit" value="Add Player" />
      </form>
      <input type="submit" value="Start Game" v-on:click.prevent="startGame" />
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="player in players" v-bind:key="player.name">
            {{ player.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-show="!isFirstRound"
          v-for="(round, index) in rounds"
          v-bind:key="index"
        >
          <td
            v-for="(player, p) in players"
            v-bind:key="player.name + p + index"
          >
            {{ round[player.name] }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th v-for="player in players" v-bind:key="player.name">
            {{ player.score }}
          </th>
        </tr>
        <tr v-if="!isGameOver && hasGameStarted">
          <th v-for="player in players" v-bind:key="player.name">
            <input type="number" v-model="scores[player.name]" />
          </th>
          <th>
            <input
              type="submit"
              value="Add score"
              v-on:click.prevent="addRound"
            />
          </th>
        </tr>
        <tr v-if="isGameOver">
          <th>{{ result }}</th>
        </tr>
      </tfoot>
    </table>
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
  }

  get isFirstRound(): boolean {
    return this.rounds.length === 1;
  }

  addRound() {
    const round: Record<string, number> = {};
    this.players.forEach((player: Player) => {
      const score: number = this.scores[player.name];
      //   this.rounds.push(score);
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
  }

  startGame() {
    this.hasGameStarted = true;
  }
}
</script>

<style></style>
