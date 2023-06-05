# App Logs

We log various information related to debug the flows on errors.
We use [Supabase](https://supabase.io/) to collect logs.

## Logging information

Logs are created through the log_event function in src/utils/common
As a developer if you want to implement logging at any step in the app just add the code `log_event({ event_log: 'Message you want to log' })` and it will be stored inside the supabase db instantly.


## Accessing Supabase

If you have been granted access to Supabase, you can easily access logs in the Supabase Events table. 

1. Log in to Supabase
2. Navigate to i-am-humna project
3. In your project's dashboard, you'll see a menu on the left-hand side of the page. Click on `Database` to open the database interface.
4. Open the Events Table
5. Review the Logs

## Note

Please remember to respect privacy and data security when accessing logs. Only use the data in accordance with your project's data handling policies.

If you face any problems or have any questions during this process, don't hesitate to reach out to your project admins for support.

For more detailed information about Supabase, please refer to the [official Supabase documentation](https://supabase.io/docs).
