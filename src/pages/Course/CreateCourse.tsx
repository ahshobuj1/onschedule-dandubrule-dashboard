'use client';

import {Button} from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {useIsMobile} from '@/hooks/use-mobile';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Coursecreate} from './type'; // ✅ use your local schema
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {toast} from 'sonner';
import {getErrorMessage} from '@/utils/getErrorMessage';
import {useState} from 'react';
import {useCreateCourseMutation} from '@/features/courses/coursesApi';
import type z from 'zod';
import {FileUploadDirectUploadDemo} from '@/components/common/FileUploadDirectUploadDemo copy';

function CreateCourse({trigger}: {trigger: React.ReactNode}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [createCourse, {isLoading}] = useCreateCourseMutation();

  const form = useForm({
    resolver: zodResolver(Coursecreate),
  });

  const onSubmit = async (data: z.infer<typeof Coursecreate>) => {
    try {
      const res = await createCourse(data).unwrap();
      toast.success(res.message || 'Course created successfully');
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error('Failed to create course:', error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Drawer
      direction={isMobile ? 'bottom' : 'right'}
      open={open}
      onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Course</DrawerTitle>
          <DrawerDescription>
            Fill in the details below to create a new course.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Course title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Short Description */}
              <FormField
                control={form.control}
                name="shortDescription"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief overview..."
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed description..."
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Has certificate */}
              <FormField
                control={form.control}
                name="hasCertificate"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Has Certificate</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 items-center">
                {/* Difficulty Level */}
                <FormField
                  control={form.control}
                  name="difficultyLevel"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({field}) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">Is Published</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Pass Percentage */}
              <FormField
                control={form.control}
                name="passPercentage"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Pass Percentage</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="70"
                        {...field}
                        value={field.value || 70}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Thumbnail URL */}
              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/thumbnail.png"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Upload File */}
              <FileUploadDirectUploadDemo
                onUploaded={(url) => {
                  form.setValue('thumbnailUrl', url);
                  toast.success('Thumbnail uploaded successfully!');
                }}
              />

              {/* Boolean Options */}
              <div className="space-y-4">
                {/* <FormField
                                    control={form.control}
                                    name="hasFinalQuiz"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-2 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel className="!mt-0">Has Final Quiz</FormLabel>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="hasCertificate"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-2 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel className="!mt-0">Has Certificate</FormLabel>
                                        </FormItem>
                                    )}
                                /> */}
              </div>
            </form>
          </Form>
        </div>

        <DrawerFooter>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            onClick={form.handleSubmit(onSubmit)}>
            {isLoading ? 'Creating...' : 'Create Course'}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CreateCourse;
