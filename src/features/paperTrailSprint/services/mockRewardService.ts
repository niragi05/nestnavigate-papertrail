export const mockRewardService = {
  async grantCoins(coins: number) {
    return Promise.resolve({
      success: true,
      coinsGranted: coins,
      rewardId: crypto.randomUUID()
    });
  }
};
