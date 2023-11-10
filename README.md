# SUBSCRIPTION STARTER

### what do you need:

- a new supabase project
- a stripe account

## EDIT THEME

The theme is located in 'src/app/global.css'. Change the colors to your liking. (you can find more themes on shadcn website)

The ui is built with shadcn and tailwind

## FILL .env.local

Copy the .env.local.example file and rename it to .env.local. Fill in the variables with your own values.

## SET UP DB

To import a schema.sql file into a new Supabase project, you can follow these steps:

- Create a new Supabase project from the dashboard.
- Once the project is created, navigate to the SQL editor by clicking on the "SQL" tab in the left sidebar.
- In the SQL editor, click on the "Import SQL" button in the top right corner.
- Select the schema.sql file that you want to import and click "Open".
- Review the SQL statements that will be executed and make sure they match your expectations.
- Click on the "Import" button to execute the SQL statements and create the schema in your new Supabase project.

Alternatively, you can use the Supabase CLI to import the schema.sql file. Here's how:

1. Install the Supabase CLI by following the instructions in the documentation.

2. Open a terminal and navigate to the directory where the schema.sql file is located.

3. Run the following command to link your local repository with your Supabase project:

```
supabase link --project-ref <project-id>
```

Replace <project-id> with the ID of your Supabase project. You can find the project ID in the URL of your project's dashboard: https://app.supabase.io/project/<project-id>/dashboard.

4. Run the following command to import the schema.sql file:

```
supabase db restore <path-to-schema.sql>
```

Replace <path-to-schema.sql> with the path to the schema.sql file on your local machine.

5. The supabase db restore command will execute the SQL statements in the schema.sql file and create the schema in your Supabase project.

That's it! You should now have a new schema in your Supabase project.
