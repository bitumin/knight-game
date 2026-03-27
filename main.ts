class Knight {
  id: number
  hp: number
  constructor(id: number) {
    this.id = id
    this.hp = 10
  }
}

class GameState {
  turn: number
  attackingKnightId: number
  defendingKnightId: number
  constructor(attackingKnightId: number, defendingKnightId: number) {
    this.turn = 1
    this.attackingKnightId = attackingKnightId
    this.defendingKnightId = defendingKnightId
  }
}

const isGameInProgress = (knights: Knight[]) => {
  return knights.filter(k => k.hp > 0).length > 1
}

const roll6Dice = () => {
  return Math.floor(Math.random() * 6) + 1
}

function findNextAliveId(firstCandidateId: number, knights: Knight[]) {
  let nextId: number
  for (let i = firstCandidateId; i < firstCandidateId + 6; i++) {
    nextId = i > 6 ? i - 6 : i
    if (knights[nextId - 1].hp > 0) {
      break;
    }
  }
  return nextId;
}

const knightAttack = (attackerId: number, defenderId: number, knights: Knight[]) => {
  // attack
  const attackRoll = roll6Dice()
  const defendingKnight = knights[defenderId - 1]
  defendingKnight.hp -= attackRoll

  // action feedback
  console.log(`Knight ${attackerId} attacks Knight ${defenderId} and does ${attackRoll} points of damage!`)
  if (defendingKnight.hp <= 0) {
    const aliveKnights = knights.filter(k => k.hp > 0);
    const idsListStr = aliveKnights.map(k => k.id).join(`,`);
    const whoIsAliveStr = aliveKnights.length > 1 ? `But Knights ${idsListStr} are still alive!` : `But Knight ${idsListStr} is still alive!`
    console.log(`Knight ${defenderId} is now dead! ` + whoIsAliveStr)
  }
}

const getLastStanding = (knights: Knight[])=> {
  return knights.find(k => k.hp > 0)
}

const main = () => {
  const knight1 = new Knight(1)
  const knight2 = new Knight(2)
  const knight3 = new Knight(3)
  const knight4 = new Knight(4)
  const knight5 = new Knight(5)
  const knight6 = new Knight(6)
  const knights = [knight1, knight2, knight3, knight4, knight5, knight6]
  const state = new GameState(1, 2)
  while (isGameInProgress(knights)) {
    console.log(`=== Turn ${state.turn} ===`)
    knightAttack(state.attackingKnightId, state.defendingKnightId, knights)
    state.attackingKnightId = findNextAliveId(state.attackingKnightId + 1, knights)
    state.defendingKnightId = findNextAliveId(state.attackingKnightId + 1, knights)
    state.turn += 1
  }
  const winner = getLastStanding(knights)
  console.log(`Game is over, knight ${winner.id} won with ${winner.hp} HP after ${state.turn} turns!`)
}

main()
