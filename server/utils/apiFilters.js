class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    // This allows for people to search for keywords and they don't have to be exact matches, they are not case sensitive and can be close
    // $regex and $options below are special mongoose operators we can use in our query
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    //   Below allows
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filters() {
    const queryCopy = { ...this.queryStr };

    // Fields to remove
    const fieldsToRemove = ["keyword"];
    fieldsToRemove.forEach((el) => delete queryCopy[el]);

    // Advanced filters for price, ratings etc
    let queryStr = JSON.stringify(queryCopy);
    // This puts the string into regex format so we can check if any of the queries are greater than, greater or equal to, less than, or less than or equal to
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}

export default APIFilters;
