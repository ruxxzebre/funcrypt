defmodule Cryptorsa do
  alias Cryptorsa.RSA

  @private_key_path "./private_key.pem"
  @public_key_path "./private_key.pem"

  @moduledoc """
  Documentation for `Cryptorsa`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Cryptorsa.hello()
      :world

  """
  def encrypt do
    public_key = RSA.decode_key(File.read!(@private_key_path));
    text = "Chaikovskyi Pavlo"
    cyphertext = text |> RSA.encrypt {:public, public_key}
    encrypted_b64 = :base64.encode_to_string cyphertext
    encrypted_b64
  end

  def encrypt(text) do
    public_key = RSA.decode_key(File.read!(@private_key_path));
  end
end
