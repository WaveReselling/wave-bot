require('dotenv').config();
const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    ChannelType,
    PermissionsBitField,
    Events
} = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Bot online as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {

    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'shop') {

            const embed = new EmbedBuilder()
                .setTitle('🌊 Wave Reselling')
                .setDescription('Premium Digital Service\nFast • Secure • Trusted')
                .setColor('#00bfff')
                .setImage('HIER_DEIN_GIF_LINK');

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('💳 PayPal')
                        .setStyle(ButtonStyle.Link)
                        .setURL('https://paypal.me/DEINNAME'),

                    new ButtonBuilder()
                        .setLabel('🪙 Crypto')
                        .setStyle(ButtonStyle.Link)
                        .setURL('DEIN_CRYPTO_LINK'),

                    new ButtonBuilder()
                        .setLabel('🎫 Open Ticket')
                        .setStyle(ButtonStyle.Primary)
                        .setCustomId('ticket')
                );

await interaction.reply({ embeds: [embed], components: [row] });
        }
    }

    if (interaction.isButton()) {
        if (interaction.customId === 'ticket') {

            const channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel]
                    }
                ]
            });

            await channel.send(`Welcome ${interaction.user}, please write what you want to buy.`);
            await interaction.reply({ content: '✅ Ticket created!', ephemeral: true });
        }
    }
});

client.login(process.env.TOKEN);
