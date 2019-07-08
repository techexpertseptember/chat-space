# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation
## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false|

### Association
has_many :groups, through: :members
has_many :messages
has_many :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
has_many :users, through: :members
has_many :messages
has_many :members

## messegesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
|body|text|
|image|string|

### Association
- belongs_to :group
- belongs_to :user

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
