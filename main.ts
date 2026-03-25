interface IKnight {
  id: number,
  hp: number,
}

interface IGameState {
  turn: number,
  attackingKnightId: number,
  defendingKnightId: number,
}

class Knight implements IKnight {
  id: number
  hp: number
  constructor(id: number) {
    this.id = id
    this.hp = 10
  }
}

class GameState implements IGameState {
  turn: number
  attackingKnightId: number
  defendingKnightId: number
  constructor(attackingKnightId: number, defendingKnightId: number) {
    this.turn = 0
    this.attackingKnightId = attackingKnightId
    this.defendingKnightId = defendingKnightId
  }
}

const isGameInProgress = (knights: IKnight[]) => {
  return knights.filter(k => k.hp > 0).length > 1
}

const roll6Dice = () => {
  return Math.floor(Math.random() * 6) + 1
}

const knightAttack = (state: GameState, knights: Knight[]) => {
  //const attackerId = state.attackingKnightId
  const defenderId = state.defendingKnightId

  // attack
  const attackRoll = roll6Dice()
  const defendingKnight = knights[defenderId - 1]
  defendingKnight.hp -= attackRoll

  // calculate next turn state (we could extract a pair of functions here)
  let nextAtkId: number
  for (let i = defenderId; i < defenderId + 6; i++) {
    nextAtkId = i > 6 ? i - 6 : i
    if (knights[nextAtkId - 1].hp > 0) {
      break;
    }
  }
  state.attackingKnightId = nextAtkId

  let nextDefId: number
  for (let k = nextAtkId + 1; k < nextAtkId + 6 + 1; k++) {
    nextDefId = k > 6 ? k - 6 : k
    if (knights[nextDefId - 1].hp > 0) {
      break;
    }
  }

  state.defendingKnightId = nextDefId
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
    knightAttack(state, knights)
  }
  const winner = getLastStanding(knights)
  console.log(`Game is over, knight ${winner.id} won with ${winner.hp} HP!`)
}

main()
