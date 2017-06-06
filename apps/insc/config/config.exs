use Mix.Config

config :insc, ecto_repos: [Insc.Repo]

import_config "#{Mix.env}.exs"
