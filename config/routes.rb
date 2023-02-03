# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'games#splash'

  get 'play', to: 'games#play'
  get 'inter', to: 'games#inter'
  get 'restart', to: 'games#restart'

  resource :game, only: %i[new create]

  post 'answer', to: 'games#answer'

  get 'lost', to: 'games#lost'

  get 'leaderboard', to: 'leaderboards#home'
end
