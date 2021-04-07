class CreateAnimals < ActiveRecord::Migration[6.1]
  def change
    create_table :animals do |t|
      t.string :img_src
      t.integer :age
      t.string :gender
      t.string :breed
      t.string :desctription
      

      t.timestamps
    end
  end
end
