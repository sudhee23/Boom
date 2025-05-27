// 2. forms/UploadVideoForm.jsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useUploadVideo } from "../api/authApi";

const videoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  videoType: z.enum(["short", "long"]),
  videoFile: z.any().optional(),
  videoURL: z.string().url().optional(),
  price: z.coerce.number().optional(),
});

const UploadVideoForm = () => {
  const [type, setType] = useState("short");
  const { uploadVideo, isPending } = useUploadVideo();
  const form = useForm({
    resolver: zodResolver(videoSchema),
    defaultValues: { title: "", description: "", videoType: "short" },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("videoType", type);
    if (type === "short") formData.append("videoFile", data.videoFile[0]);
    else {
      formData.append("videoURL", data.videoURL);
      formData.append("price", data.price || 0);
    }
    uploadVideo(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField name="title" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Title</FormLabel>
            <FormControl><Input {...field} className="rounded-xl" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="description" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Description</FormLabel>
            <FormControl><Input {...field} className="rounded-xl" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="videoType" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Video Type</FormLabel>
            <FormControl>
              <select
                {...field}
                onChange={(e) => { field.onChange(e); setType(e.target.value); }}
                className="w-full border px-3 py-2 rounded-xl bg-white"
              >
                <option value="short">Short</option>
                <option value="long">Long</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {type === "short" ? (
          <FormField name="videoFile" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Video File (.mp4)</FormLabel>
              <FormControl>
                <Input type="file" accept="video/mp4" onChange={(e) => field.onChange(e.target.files)} className="rounded-xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        ) : (
          <>
            <FormField name="videoURL" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Video URL</FormLabel>
                <FormControl><Input {...field} className="rounded-xl" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="price" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Price (₹)</FormLabel>
                <FormControl><Input type="number" {...field} className="rounded-xl" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </>
        )}

        <Button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl font-medium"
        >
          {isPending ? "Uploading..." : "Upload Video"}
        </Button>
      </form>
    </Form>
  );
};

export default UploadVideoForm;
