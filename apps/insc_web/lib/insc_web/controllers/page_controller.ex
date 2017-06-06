defmodule Insc.Web.PageController do
  use Insc.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
