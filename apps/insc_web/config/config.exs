# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :insc_web,
  namespace: Insc.Web,
  ecto_repos: [Insc.Repo]

# Configures the endpoint
config :insc_web, Insc.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "X/NVwUeWRoWPRv+eOrL/xdWGjxoPYePFsqbl93sBf3cnG7plmYMeFHPnlEV6uLtl",
  render_errors: [view: Insc.Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Insc.Web.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :insc_web, :generators,
  context_app: :insc

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
