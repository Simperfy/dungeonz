const Item = require("../Item");

class Holdable extends Item {
    destroy() {
        // If this item is being held, take it off the owner.
        if (this.owner.holding === this) {
            this.owner.modHolding(null);
        }
        super.destroy();
    }

    use() {
        this.equip();
    }

    useWhileHeld(direction) {
        if (this.checkUseCriteria(direction)) {
            this.onUsedWhileHeld(direction);
        }
    }

    /**
     * Use this held item. Typically attacks.
     * @param {String} [direction] - A specific direction to use the item in. Otherwise uses the owner's direction.
     */
    onUsedWhileHeld(direction) {
        // Turn them to face the use direction.
        if (this.owner.direction !== direction) {
            this.owner.modDirection(direction);
        }

        this.onUsed(direction);
    }

    equip() {
        const { owner } = this;

        // If this item is already being held, take it off.
        if (owner.holding === this) {
            this.unequip();
        }
        // Owner is trying to hold something else.
        else {
            // If they are already holding something when putting the new holdable on.
            if (owner.holding !== null) {
                // Remove the CURRENT item before holding another one.
                owner.holding.unequip();
            }
            this.owner.modHolding(this);
        }
    }

    unequip() {
        this.owner.modHolding(null);
    }
}

Holdable.abstract = true;

module.exports = Holdable;
