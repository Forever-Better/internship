import { api } from '../api/api';

interface FileData {
  file: { url: string; ref: string };
}

export const fileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<FileData, FormData>({
      query: (formData: FormData) => ({
        url: 'https://thepirate.press/api/files/upload',
        method: 'POST',
        body: formData
      })
    })
  })
});

export const { useUploadFileMutation } = fileApi;
