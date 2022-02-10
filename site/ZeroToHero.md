# From zero to hero

If it's first time your creating a telegram bot in c#, then you're in the right place. Here i'll start from zero to create a telegram bot.

## Api token

The very first thing you need is an api token for your bot.

1. It's super easy to get one! Head toward [@BotFather](https://t.me/botfather), the father of all bots in telegram.

2. `/start` the bot and send Command `/newbot` to the bot father.

3. You'll be asked for a name and a username for your bot.

    > _You can change the name later, but username can't be changed!_

4. You're done! the api key is in the congrats message.

   It's something like `123456789:AAEBfa-pTNt4fC9O1_Gw3FD9ZnreySiWhc8`.

## Console app

In this tutorial we create a dotnet console app.

My .NET version is `6.x.x`, so it's a .NET 6 Console app template.
_I Highly recommend you to use the newer version of dotnet._

> I assumed that you have dotnet 6 sdk installed on your system.

1. Pick a directory of your choice and open a command line in it.

2. Write following command and hit Enter:

   ```cmd
   > dotnet new console
   ```

   This will create a console app in current directory.

3. Execute following command to test your app:

   ```cmd
   > dotnet run
   Hello World
   ```

    Congrats, you have successfully created a console app.

4. Open file `Program.cs` into your favorite editor ( i suggest VSCode ), to see the code inside. It should be something like this:

   ```csharp
   // blah blah blah
   Console.WriteLine("Hello World");
   ```

## Install `Updater` (This package)

Now in order to connect to the telegram bot api you can use `Updater`.

Updater is available in [Nuget](https://www.nuget.org/packages/TelegramUpdater).

1. Open a terminal and execute following command to install updater from nuget.

   ```cmd
   > dotnet add package TelegramUpdater
   ```

2. The updater should be installed now. You can try referencing it.

   ```csharp
   using TelegramUpdater;
   ```

   Run the app to see if it works.

## Setup Updater

The most important class of this package is `Updater`. You can directly create an instance of it but for now we have something better: `UpdaterBuilder`.

`UpdaterBuilder` is some kind of helper class to help you create your `Updater` in an easier way and with some necessary default options.

### 0. Step Zero

Creating `UpdaterBuilder`.

1. Reference `TelegramUpdater`

   ```csharp
   using TelegramUpdater;
   ```

2. Create an instance of `UpdaterBuilder`

   ```csharp
   var builder = new UpdaterBuilder("BOT_TOKEN")
   ```

   _Replace `BOT_TOKEN` with you own token from step on._

### 1. Step One

Set options.

Call method `StepOne` of builder with no parameters to set default options.

```csharp
builder.StepOne();
```

> There are a batch of options that you can modify. The method itself is fully documented.

### 2. Step Two

This step is to set an **`ExceptionHandler`** which will track exceptions occurred while handling updates.

Again you can call method `StepTwo` with no parameters for a default exception handler.

```csharp
builder.StepTwo();
```

### Step There

This step is to set an update handler.

An update handler has two primary jobs.

1. Choose the right update to handle.

   Of course you wanna handle some specified updates, not all of them.

   For instance you may want to handle a `Message Update` that has a `/start` command in it as `Text`.

   In `TelegramUpdater` we do this using filters.

   >  All filter are child classes of `Filter</T>` where `T` is the update type. Eg: `Filter<Message>` for `Message` updates.

   There is an static class called `FilterCutify` which contains a set of ready to use filters for you.

   Here we can use

   ```csharp
   FilterCutify.OnCommand("start")
   ```

   to create a filter for text messages like: `/start`.

   Add following code in your file:

   ```csharp
   var myFilter = FilterCutify.OnCommand("start");
   ```

   Your filter is ready.

2. Handle matched updates.

   After an update passed your filter, you have to handle it in a suitable way.

   For instance you may want to answer an `/start` Command with `Started` as text respond.

   Handling updates are done in callback functions.

   The callback function takes an instance of `UpdateContainerAbs<T>` as parameter.

   `T` is the update type ( `UpdateContainerAbs<Message>` for messages. )

   Callback functions are all async and all should return a `Task`.

   Create a callback function:

   ```csharp
   static async Task HandleStartMessage(UpdateContainerAbs<Message> updateContainer)
   {
      await updateContainer.Response("Started!");
   }
   ```

   You need following namespaces.

   ```csharp
   using Telegram.Bot.Types;
   using TelegramUpdater.UpdateContainer;
   ```

   Your callback function is ready.

Now you're ready to complete `StepThere`.

Pass your filter and callback function to the `StepThere` method.

```csharp
var updater = builder.StepThree(HandleStartMessage, myFilter);
```

`StepThere` Gives you an instance of `Updater`.

Your code should looks like this so far:

```csharp
using TelegramUpdater;
using Telegram.Bot.Types;
using TelegramUpdater.UpdateContainer;

var builder = new UpdaterBuilder("BOT_TOKEN");

builder.StepOne();

builder.StepTwo();

var myFilter = FilterCutify.OnCommand("start");

static async Task HandleStartMessage(UpdateContainerAbs<Message> updateContainer)
{
    await updateContainer.Response("Started!");
}

var updater = builder.StepThree(HandleStartMessage, myFilter);
```

### Start

Now all you need is to start the updater.

```csharp
await updater.Start();
```

> `await` keyword is essential!

### Test it

Head toward your bot and send `/start` command and see if it works.

### Full Code

Here is the full code in a compact version.

```csharp
using TelegramUpdater;
using Telegram.Bot.Types;
using TelegramUpdater.UpdateContainer;

static async Task HandleStartMessage(UpdateContainerAbs<Message> updateContainer)
{
    await updateContainer.Response("Started!");
}

var updater = new UpdaterBuilder("BOT_TOKEN")
    .StepOne()
    .StepTwo()
    .StepThree(HandleStartMessage, FilterCutify.OnCommand("start"));

await updater.Start();
```

And a version of code without `UpdaterBuilder`

```csharp
using TelegramUpdater;
using Telegram.Bot.Types;
using TelegramUpdater.UpdateContainer;
using Telegram.Bot;
using TelegramUpdater.UpdateHandlers.SealedHandlers;

static async Task HandleStartMessage(UpdateContainerAbs<Message> updateContainer)
{
    await updateContainer.Response("Started!");
}

static Task HandleException(Updater updater, Exception exception)
{
    Console.WriteLine(exception);
    return Task.CompletedTask;
}

var updater = new Updater(new TelegramBotClient("BOT_TOKEN"));

updater.AddExceptionHandler<Exception>(HandleException);

updater.AddUpdateHandler(
    new MessageHandler(
        HandleStartMessage, FilterCutify.OnCommand("start")));

await updater.Start();
```
