import { IGeolocationResponse } from "../../models";

export const fromGeoResponseDto = (dto: IGeolocationResponse) => {
    return dto[0].local_names.ru;
}
