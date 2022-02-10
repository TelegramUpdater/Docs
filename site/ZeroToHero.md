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
   Console.WriteLine("Hello World");
   ```
