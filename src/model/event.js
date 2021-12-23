const eventModel = (sequelize, Sequelize) => {
  const Event = sequelize.define("Event", {
    // id: {
    //   type: Sequelize.UUID,
    //   defaultValue: Sequelize.UUIDV4,
    //   primaryKey: true,
    // },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  return Event;
};

export default eventModel;
