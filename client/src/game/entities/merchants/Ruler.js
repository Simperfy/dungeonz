import Merchant from "./Merchant";
import NPCShopTypes from "../../../catalogues/NPCShopTypes.json";

class Entity extends Merchant {
    constructor(x, y, config) {
        config.displayName = "Ruler";
        super(x, y, config);

        this.baseSprite.setFrame("ruler-1");
        this.npcShopType = NPCShopTypes.Ruler;
    }
}

export default Entity;
