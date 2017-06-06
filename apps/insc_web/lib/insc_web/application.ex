defmodule Insc.Web.Application do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the endpoint when the application starts
      supervisor(Insc.Web.Endpoint, []),
      # Start your own worker by calling: Insc.Web.Worker.start_link(arg1, arg2, arg3)
      # worker(Insc.Web.Worker, [arg1, arg2, arg3]),
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Insc.Web.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
