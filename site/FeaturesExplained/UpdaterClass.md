## Updater class
In telegram updater package, `Updater` class has a essential role and almost everything done within it.

### What's the duty
By default, updater gets an instance of `ITelegramBotClient` and usew it to make api requests like `getUpdates` and ...

Updater gets updates from telegram bot api, process and orders them and sends them to the handlers you specified.

### Constructor
- **`ITelegramBotClient`**: 

This is the instance of your bot client.

- **`UpdaterOptions`**:

 A set of options to customize the updater behavior.

#### Available options 
- `int? MaxDegreeOfParallelism`:  Maximum number of allowed concurent update handling tasks. 
> If the bot becomes to busy, the updater would try to limit the rate! so it doesn't let updates count that are being handled at same time gose more than this value.

- `bool PerUserOneByOneProcess`: This option indicates if user can have multiple updates that are being handled at the same time.
> By enabling this, user has to wait a request of him to finish then starts a new one.

- `ILogger<Updater>? Logger`: a logger! updater will create a default if you leave this empty.

- `bool FlushUpdatesQueue`: If the updater is reponseable for getting updates, it will tell that old pending updates should be ignored and updater should receive updates from now.

- `UpdateType[] AllowedUpdates`: An array of `UpdateType` to specify the allowed updates. Again If the updater is reponseable for getting updates!

- And a `CancellationToken` to cancel the jobs.

**`IServiceProvider`**

This argument is not required! but if you have a service collection available, Updater behavior improves when handling `IScopedUpdateHandler`s, for instance, DI will be available inside them and they will be a real scoped operations.

### Available methods

Here we have a list of available methods directly from updater.

#### Adding Update Handler
There are two major methods for this.

- `AddUpdateHandler(ISingletonUpdateHandler updateHandler)`

Use this to add a singleton update handler to the updater

> Singleton handlers are creating ones and by yourself.

- `AddScopedHandler(IScopedHandlerContainer scopedHandlerContainer)`

Use this to add an scoped handler container to the updater. Every container contains an `IScopedUpdateHandler` and a `Filter`.

> Scoped handlers are created per each request any automatically by updater.
> If you passed an `IServiceCollection` to the updater costructor, then updater will use it to create scopes and new instances. and DI will be available!
> If there's a `IServiceCollection`, normal handlers won't work!

##### Note
You don't have to use this methods directly, but there are many extension methods available to make it easier.

#### Adding Exception Handler

`AddExceptionHandler(IExceptionHandler exceptionHandler)`

Exception handler let you define a job for each type of exception that occurs inside a handler.

#### Opening channels

`OpenChannel<T>(AbstractChannel<T> updateChannel, TimeSpan timeOut)`

This method allows you to wait for a specified update to come inside a handler, for instance you can send a button to the user and wait for him in place!

- `AbstractChannel<T> updateChannel`: This class helps updater find the right update using filters.
- `TimeSpan timeOut`: Maximum allowed waiting time.

```csharp
            var msg = await container.Response($"Are you ok? answer quick!",
                replyMarkup: new InlineKeyboardMarkup(
                    InlineKeyboardButton.WithCallbackData("Yes i'm OK!", "ok")));

            await container.ChannelUserClick(TimeSpan.FromSeconds(5), "ok")
                .IfNotNull(async answer =>
                {
                    await answer.Edit(text: "Well ...");
                })
                .Else(async _ =>
                {
                    await msg.Edit("Slow");
                });
```

> `ChannelUserClick` is an extension method for `OpenChannel`.

#### Start!

using `Start` method you tell the updater to start the job!

- Here you can specify if this method should block or not, or the updater is reponseable for getting updates and ...
