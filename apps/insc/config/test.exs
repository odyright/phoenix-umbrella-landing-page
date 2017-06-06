use Mix.Config

# Configure your database
config :insc, Insc.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "insc_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
