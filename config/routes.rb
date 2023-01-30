# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'games#splash'

  get 'play', to: 'games#play'
  get 'restart', to: 'games#restart'

  post 'answer', to: 'games#answer'

  get 'lose-screen', to: 'games#lost'
end
