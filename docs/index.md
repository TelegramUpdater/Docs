# Telegram Updater Documentations

Telegram Updater is a .NET package written in C# that helps you receive updates from Telegram Bot Api.

Updater is made to bring simplicity when working with telegram bots in .NET.

Updaters uses [Telegram.Bot](https://github.com/TelegramBots/Telegram.Bot) as dependency to work with api. This a framework written on top of Telegram.Bot.

TelegramUpdater requires you to use **.NET Core 3.1** and above!

TelegramUpdater is highly adjustable for any type of common SDKs in .NET

- Normal apps with no hosting  
- Worker Service
- ASP .NET app
- ...

## Example of WorkerService

```csharp
using WorkerService;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddTelegramUpdater(
            "BOT_TOKEN",
            default,
            (builder) => builder
                .AddMessageHandler<SimpleMessageHandler>()
        );
    })
    .Build();

await host.RunAsync();

```

That's minimum the requirements, but there're a lot of customizations.
