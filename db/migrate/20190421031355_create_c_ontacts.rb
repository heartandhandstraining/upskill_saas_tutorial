class CreateCOntacts < ActiveRecord::Migration[5.0]
  def change
    create_table :c_ontacts do |t|
      t.string :name
      t.string :email
      t.string :comments
      t.timestamps
    end
  end
end
