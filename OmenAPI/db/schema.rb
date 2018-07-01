# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_07_01_145108) do

  create_table "locations", force: :cascade do |t|
    t.float "lng"
    t.float "lat"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lat", "lng"], name: "index_locations_on_lat_and_lng", unique: true
    t.index ["lat"], name: "index_locations_on_lat"
    t.index ["lng", "lat"], name: "index_locations_on_lng_and_lat", unique: true
    t.index ["lng"], name: "index_locations_on_lng"
  end

  create_table "omen", force: :cascade do |t|
    t.text "message"
    t.integer "location_id"
    t.integer "score"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "user_uuid"
    t.index ["location_id"], name: "index_omen_on_location_id"
  end

  create_table "votes", force: :cascade do |t|
    t.integer "value"
    t.string "user_uuid"
    t.integer "omen_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["omen_id"], name: "index_votes_on_omen_id"
    t.index ["user_uuid", "omen_id"], name: "index_votes_on_user_uuid_and_omen_id", unique: true
  end

end
