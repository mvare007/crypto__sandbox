class CreateVsCurrencies < ActiveRecord::Migration[6.1]
  def change
    create_table :vs_currencies do |t|
      t.string :symbol

      t.timestamps
    end
  end
end
