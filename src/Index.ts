import * as Discord from "discord.js";
import {config} from "../config/LiveConfig";

const a = new Discord.Client();
a.login( config.discord.token );