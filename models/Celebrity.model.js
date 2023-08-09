const { Schema, model } = require("mongoose");

const celebritieSchema = new Schema(
    {
            name: String,
            ocupation: String,
            catchPhrase: String,

}
)

const celebritie = model("celebritie", celebritieSchema);

module.exports = celebritie
