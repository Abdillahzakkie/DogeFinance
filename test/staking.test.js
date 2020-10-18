const web3 = require('web3');
const MyToken = artifacts.require('MyToken');
const StakingToken = artifacts.require('StakingToken');

const token = value => web3.utils.toWei(value);

contract('Staking TOken', async accounts => {
    let user1;
    let user2;
    let user3;
    let use4;

    before(async () => {
        user1 = accounts[0];
        user2 = accounts[1];
        user3 = accounts[2];
        user4 = accounts[3];

        const amountToStake = '302144000000000000000000';

        this.token = await MyToken.deployed({ from: user1 });
        await this.token._mint(user1, token(amountToStake), { from: user1 });

        this.contract = await StakingToken.deployed(this.token.address, { from: user1 });
    });

    it('should not stake if stake is less than minimum amount', async () => {
        try {
            // should throw an exception
            await this.contract.stake(token('2000000'), user1, { from: user1 })
        } catch (error) {
            assert(error.message.includes("Amount is below minimum stake value."));
            return
        }
        assert(false);
    })

    it('should not stake if token balance of user is less than the amount to be staked', async () => {
        try {
            const minimumStakeValue = (await this.contract.minimumStakeValue()).toString();
            // should throw an exception
            await this.contract.stake(token(minimumStakeValue), user2, { from: user2 });
        } catch (error) {
            assert(error.message.includes("Must have enough balance to stake"));
            return;
        }
        assert(false)
    })

    it('should add user to stakeholders', async () => {
        await this.contract.stake(token(minimumStakeValue), user1, { from: user1 });
        const { staker, id } = await this.contract.stakeholders(user1);
        console.log(staker, id)
        assert.equal(staker, true);
        assert.equal(id, 0);
    })
})