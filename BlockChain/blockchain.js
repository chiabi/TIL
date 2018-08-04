class Block {
  constructor(index, hash, previousHash, timestamp, data) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
  }
}

// 해쉬: 인풋을 복잡한 수학적 함수로 뱉어낸 랜덤 아웃풋
// sha256 online 
