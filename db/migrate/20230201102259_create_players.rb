# frozen_string_literal: true

class CreatePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :players do |t|
      t.string :name, null: false
      t.integer :score, default: 0
      t.string :difficulty, default: 'easy'

      t.timestamps
    end
  end
end
