import { GraphQLScalarType, Kind } from 'graphql';
import dayjs from 'dayjs';
const DateTimeISOResolver = new GraphQLScalarType({
    name: 'DateTimeISO',
    description: 'DateTime in ISO 8601 format',
    serialize(value) {
        // Convert the Date object to ISO 8601 format string
        return dayjs(value).toISOString();
    },
    parseValue(value) {
        if (typeof value === 'string') {
            // Parse the ISO 8601 format string to Date object
            return dayjs(value).toDate();
        }
        return null;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            // Parse the ISO 8601 format string to Date object
            return dayjs(ast.value).toDate();
        }
        return null;
    },
});
export default DateTimeISOResolver;
