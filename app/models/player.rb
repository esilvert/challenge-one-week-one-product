# frozen_string_literal: true

class Player < ApplicationRecord
  validates :name, presence: true
  validates :score, presence: true, numericality: { greater_or_equals_than: 0 }
  validates :difficulty, presence: true, inclusion: { in: %w[easy medium hard] }
end
